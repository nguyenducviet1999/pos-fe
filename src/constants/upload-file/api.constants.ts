// Upload File
export const PREFIX_API_FILE_STORE = "/file";
export const PREFIX_API_MULTI_FILE = "file/upload/bulk";

export const ctUploadFileAPI = {
  API_COMMON_CONTENT_EDITOR_UPLOAD_PICTURE_VIDEO: `${PREFIX_API_FILE_STORE}/upload/editor`,
  // For type Entity
  API_BUSINESS_NATION: `${PREFIX_API_FILE_STORE}/upload/nation`,
  API_BUSINESS_LOCATION: `${PREFIX_API_FILE_STORE}/upload/location`,
  API_OPERATING_COMPETITION_SITE: `${PREFIX_API_FILE_STORE}/upload/competition-site-image`,
  API_OPERATING_COMPETITION_SYSTEM: `${PREFIX_API_FILE_STORE}/upload/competition-system-image`,
  // API_OPERATING_CTTP_TOURNAMENT_SITE: `${PREFIX_API_FILE_STORE}/upload/cttp-tournament-site-image`,
  // API_OPERATING_CTTP_TOURNAMENT_SYSTEM: `${PREFIX_API_FILE_STORE}/upload/cttp-tournament-system-image`,
  // API_OPERATING_SCRAMBLE_TOURNAMENT_SITE: `${PREFIX_API_FILE_STORE}/upload/scramble-tournament-site-image`,
  // API_OPERATING_SCRAMBLE_TOURNAMENT_SYSTEM: `${PREFIX_API_FILE_STORE}/upload/scramble-tournament-system-image`,
  API_OPERATING_NOTICE_GLOBAL: `${PREFIX_API_FILE_STORE}/upload/notice-global`,
  API_OPERATING_NOTICE_GSM_MULTI: `${PREFIX_API_MULTI_FILE}/notice-gsm`, // old have remove API_OPERATING_NOTICE_GSM: `${PREFIX_API_FILE_STORE}/upload/notice-gsm`,
  API_MARKETING_POPUP: `${PREFIX_API_FILE_STORE}/upload/popup`,
  API_MARKETING_PROMOTION_POPUP: `${PREFIX_API_FILE_STORE}/upload/promotion-popup`,
  API_MARKETING_BANNER_GLOBAL: `${PREFIX_API_FILE_STORE}/upload/banner`,
  API_MARKETING_BANNER_GSM: `${PREFIX_API_FILE_STORE}/upload/banner-gsm`,
  API_MARKETING_BANNER_GS: `${PREFIX_API_FILE_STORE}/upload/ad`,
  API_MARKETING_EVENT: `${PREFIX_API_FILE_STORE}/upload/event`,
  API_MARKETING_PUSH_EXCEL: `${PREFIX_API_FILE_STORE}/upload/pushUserList`,
  API_MARKETING_PUSH_IMAGE: `${PREFIX_API_FILE_STORE}/upload/push`,
  API_MARKETING_CAMPAIGN: `${PREFIX_API_FILE_STORE}/upload/campaign-attachment`,
  API_GTOUR_APPLICATION_REPRESENTATIVE: `${PREFIX_API_FILE_STORE}/upload/test-api`,
  API_UPLOAD_EXCEL_TARGET_GROUP_MEMBER: `/marketing/target-group/member/upload`,
};

export const ctUploadFileKeyAPI = {
  API_OPERATING_NOTICE_GSM: (id: string, name: string) =>
    `${PREFIX_API_FILE_STORE}/upload/${id}/${name}`,
};

export const ctGetFileKeyAPI = {
  API_OPERATING_NOTICE_GSM: (id: string, name: string) =>
    `${PREFIX_API_FILE_STORE}/file-key/${id}/${name}`,
};
