export interface CareersResponse {
  data: CareersData;
}

export interface CareersData {
  careers_breadcrumb: CareersBreadcrumb;
  benefits: Benefit[];
  jobPositions: JobPosition[];
}

export interface CareersBreadcrumb {
  key: string;
  title: string;
  second_title: string | null;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
  status: number;
}

export interface Benefit {
  title: string;
  order: number;
  short_desc: string;
  long_desc: string;
  image: string;
  alt_image: string | null;
  icon: string;
  alt_icon: string | null;
}

export interface JobPosition {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  image: string | null;
  icon: string | null;
}