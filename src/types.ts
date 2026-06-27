export interface BusinessBullet {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

export interface MetricItem {
  label: string;
  labelEn: string;
  direction: 'up' | 'down' | 'none';
  value?: string;
}

export interface BusinessSection {
  id: string;
  title: string;
  titleEn: string;
  typeTag: string;
  typeTagEn: string;
  pain: string;
  painEn: string;
  solution: string;
  solutionEn: string;
  bullets: BusinessBullet[];
  metrics: MetricItem[];
  actionText: string;
  actionTextEn: string;
  actionValue: string;
  actionType: 'wechat' | 'qq';
  actionSub: string;
  actionSubEn: string;
  imageUrl?: string;
}

export interface ManifestoItem {
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
}
