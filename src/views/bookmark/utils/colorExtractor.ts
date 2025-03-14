import quantize from 'quantize';

// 定义颜色类型
type RGB = [number, number, number];
type ColorInfo = {
  color: RGB;
  weight: number;
};

// 计算两个颜色之间的欧氏距离，考虑人眼对不同颜色通道的敏感度
export const getColorDistance = (color1: RGB, color2: RGB): number => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  // 根据人眼对RGB的敏感度设置权重
  const rWeight = 0.299;
  const gWeight = 0.587;
  const bWeight = 0.114;
  
  return Math.sqrt(
    rWeight * Math.pow(r1 - r2, 2) +
    gWeight * Math.pow(g1 - g2, 2) +
    bWeight * Math.pow(b1 - b2, 2)
  );
};

// 找到最相似的颜色对，考虑颜色权重
export const findSimilarColors = (colors: ColorInfo[]): [RGB, RGB] | null => {
  let minDistance = Infinity;
  let similarPair: [RGB, RGB] | null = null;

  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const distance = getColorDistance(colors[i].color, colors[j].color);
      // 根据颜色权重调整相似度阈值
      const weightedThreshold = 100 * Math.min(colors[i].weight, colors[j].weight);
      if (distance < minDistance && distance < weightedThreshold) {
        minDistance = distance;
        similarPair = [colors[i].color, colors[j].color];
      }
    }
  }

  return similarPair;
};

// 计算颜色的HSL值
export const getColorHSL = (color: RGB): { hue: number; saturation: number; lightness: number } => {
  const [r, g, b] = color.map(c => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  
  let hue = 0;
  let saturation = 0;
  
  if (max !== min) {
    const d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      case b:
        hue = (r - g) / d + 4;
        break;
    }
    hue /= 6;
  }
  
  return { hue, saturation, lightness };
};

// 判断颜色是否为极端值或低饱和度
export const isColorExtreme = (color: RGB): boolean => {
  const { saturation, lightness } = getColorHSL(color);
  // 调整阈值以更好地识别极端颜色
  const isLowSaturation = saturation < 0.15;
  const isTooDark = lightness < 0.12;
  const isTooLight = lightness > 0.88;
  return isLowSaturation || isTooDark || isTooLight;
};

// 计算加权平均颜色
export const calculateWeightedAverageColor = (colors: ColorInfo[]): RGB => {
  const totalWeight = colors.reduce((sum, { weight }) => sum + weight, 0);
  
  const weightedSum = colors.reduce((acc, { color, weight }) => [
    acc[0] + color[0] * weight,
    acc[1] + color[1] * weight,
    acc[2] + color[2] * weight
  ], [0, 0, 0]);

  return weightedSum.map(value => Math.round(value / totalWeight)) as RGB;
};

// 计算像素在图像中的权重
const calculatePixelWeight = (x: number, y: number, width: number, height: number): number => {
  // 计算像素到图像中心的距离
  const centerX = width / 2;
  const centerY = height / 2;
  const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  const maxDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
  
  // 根据距离计算权重，中心像素权重更高
  return 1 - (distanceFromCenter / maxDistance);
};

// 从图片中提取主色调
export const extractDominantColor = (imgElement: HTMLImageElement): string => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 'rgba(255, 255, 255, 0.1)';

    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const pixels: ColorInfo[] = [];

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const color: RGB = [imageData[i], imageData[i + 1], imageData[i + 2]];
        const weight = calculatePixelWeight(x, y, canvas.width, canvas.height);
        pixels.push({ color, weight });
      }
    }

    if (pixels.length > 0) {
      const colorMap = quantize(pixels.map(p => p.color), 5);
      const palette = colorMap.palette() as RGB[];

      if (palette.length > 0) {
        // 为调色板中的每个颜色计算权重
        const paletteWithWeights: ColorInfo[] = palette.map(color => ({
          color,
          weight: pixels.reduce((sum, pixel) => {
            return sum + (getColorDistance(color, pixel.color) < 25 ? pixel.weight : 0);
          }, 0)
        }));

        const averageColor = calculateWeightedAverageColor(paletteWithWeights);
        let bestColor = palette[0];
        let maxScore = -Infinity;

        // 使用综合评分系统选择最佳颜色
        for (const { color, weight } of paletteWithWeights) {
          if (!isColorExtreme(color)) {
            const distanceScore = 1 / (1 + getColorDistance(color, averageColor));
            const score = distanceScore * weight;
            
            if (score > maxScore) {
              maxScore = score;
              bestColor = color;
            }
          }
        }

        const [r, g, b] = bestColor;
        return `rgba(${r}, ${g}, ${b}, 0.15)`;
      }
    }

    return 'rgba(255, 255, 255, 0.1)';
  } catch (e) {
    console.error('Error extracting dominant color:', e);
    return 'rgba(255, 255, 255, 0.1)';
  }
};