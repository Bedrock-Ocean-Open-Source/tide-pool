import { SortOrder } from '@/shared/types/sort'

export interface Survey {
  entry_id: string
  survey_id: string
  url: string
  entry_type: string
  platform_id: string
  center_x: string
  center_y: string
  west: string
  east: string
  south: string
  north: string
  chief?: string
  gmrt_entry_id: string
  gmrt_version_number: string
  year: string
  r2r_qa?: string
  r2r_fileset_id?: string
  mac_url?: string
  mac_platform_url?: string
  public_notes?: string
  flag_file?: string
  flag_alt?: string
  proc_data_set_uid: string
  data_processor_organization: string
  is_rejected: string
  created: string
  device_make?: string
  device_model?: string
  total_area?: string
  track_length: string
  file_count: string
}

export type SurveysSliceState = {
  surveys: Survey[];
  displaySurveys: Survey[];
  isLoading: boolean;
  sortOrder: SortOrder<Survey>;
  filter?: string;
  displayedTotalArea: number;
};
