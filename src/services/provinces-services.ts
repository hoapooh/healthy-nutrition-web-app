// Service for Vietnamese provinces API
export interface Province {
  code: string;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
}

export interface District {
  code: string;
  name: string;
  division_type: string;
  codename: string;
  province_code: string;
}

export interface Ward {
  code: string;
  name: string;
  division_type: string;
  codename: string;
  district_code: string;
}

const BASE_URL = 'https://provinces.open-api.vn/api';

export const provincesApi = {
  // Get all provinces/cities
  getProvinces: async (): Promise<Province[]> => {
    const response = await fetch(`${BASE_URL}/p/`);
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    return response.json();
  },

  // Get districts by province code
  getDistricts: async (provinceCode: string): Promise<District[]> => {
    const response = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }
    const data = await response.json();
    return data.districts || [];
  },

  // Get wards by district code
  getWards: async (districtCode: string): Promise<Ward[]> => {
    const response = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
    if (!response.ok) {
      throw new Error('Failed to fetch wards');
    }
    const data = await response.json();
    return data.wards || [];
  },
};
