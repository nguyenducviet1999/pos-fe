import { IPolicyFileUpload } from "@src/components/element/UploadAntd";
import { uploadCheckFileNameData } from "@src/components/element/UploadAntd/helper";

const maxSizeOne = 1; // MB
const maxSizeTwo = 2; // MB
const maxSizeFive = 5; // MB
const maxSizeTeen = 10; // MB
const extJPG = "jpg";
const extJPEG = "jpeg";
const extFileSimple = [extJPEG, extJPG, "png"];
const extFileNormal = [extJPEG, extJPG, "png", "gif"];
const extFileDDS = ["dds"];
const extFileAVI = ["avi"];
const extFilePNG = ["png"];
const extZIP = ["zip"];
const extXLSX = ["xlsx"];
const extFileExcel = ["xlsx", "csv"];
const extFilePDF = ["pdf"];
const extFileSpecial = [extJPG, extJPEG, "gif", "png", "doc", "docx", "pdf", "xls", "xlsx", "hwp", "ppt", "pptx"];
const extFilePAK = ["pak"];
const extForEmailAttach = [extJPG, extJPEG, "png", "doc", "docx", "pdf", "xls", "xlsx"];

export const ctPopupUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeOne,
  ext: extFileSimple,
  width: 654,
  height: 780,
  isAutoCrop: true,
};

export const ctPromotionPopupUploadPolicy: IPolicyFileUpload = {
  ext: extFileDDS,
  maxSize: maxSizeFive,
  maxLength: 75,
  // regexCheckFileName: /^.{1,90}$/,
  width: 440,
  height: 810,
};

export const ctBannerGlobalUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeOne,
  ext: [...extFileSimple],
  width: 750,
  height: 300,
  isAutoCrop: true,
};

export const ctBannerGSUploadPolicyForTWOVISION: IPolicyFileUpload = {
  maxSize: 50,
  width: 1024,
  height: 1024,
  ext: [...extFileDDS, ...extFileAVI],
  regexCheckFileName: /^banner_loading[1-9][0-9]?\.((dds)|(avi))$/,
};

export const ctBannerGSUploadPolicyForTVNX: IPolicyFileUpload = {
  maxSize: 50,
  width: 1388,
  height: 740,
  ext: [...extFilePNG, ...extFileAVI],
  regexCheckFileName: /^banner_loading[1-9][0-9]?\.((png)|(avi))$/,
};

export const ctNoticeGlobalUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: extFileNormal,
  width: 150,
  height: 100,
  isAutoCrop: true,
  // bgAutoCrop: "#26ded7",
};

export const ctNoticeGSMUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTeen,
  ext: extFileSpecial,
};

export const ctPushUserListUploadPolicy: IPolicyFileUpload = {
  ext: extFileExcel,
};

export const ctPushUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeOne,
  ext: extFileSimple,
  isAutoCrop: true,
  width: 1024,
  height: 512,
};

export const ctCompetitionSystemImagePolicy: IPolicyFileUpload = {
  // maxSize: maxSizeTwo,
  // ext: extFileSimple,
  // width: 278,
  // height: 180,
  maxSize: maxSizeTwo,
  ext: [extJPG],
  checkFileNames: [uploadCheckFileNameData.ascii()],
};

export const ctCompetitionSiteImagePolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: [extJPG],
  width: 690,
  height: 150,
  checkFileNames: [uploadCheckFileNameData.ascii()],
  isAutoCrop: true,
};

export const ctCTTPTournamentSystemImagePolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: [extJPG],
  checkFileNames: [uploadCheckFileNameData.ascii()],
  // width: 278,
  // height: 180,
};

export const ctCTTPTournamentSiteImagePolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: [extJPG],
  width: 690,
  height: 150,
  checkFileNames: [uploadCheckFileNameData.ascii()],
  isAutoCrop: true,
};

export const ctScrambleTournamentSystemImagePolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: [extJPG],
  checkFileNames: [uploadCheckFileNameData.ascii()],
  // width: 278,
  // height: 180,
};

export const ctScrambleTournamentSiteImagePolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: [extJPG],
  width: 690,
  height: 150,
  checkFileNames: [uploadCheckFileNameData.ascii()],
  isAutoCrop: true,
};

export const ctUploadNormalPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: extFileNormal,
};

export const ctUploadEventObjectBrandZonePolicy: IPolicyFileUpload = {
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(64), uploadCheckFileNameData.eventImage(extFileDDS)],
  ext: [...extFileDDS],
};
export const ctUploadEventObjectBrandZoneForNXPolicy: IPolicyFileUpload = {
  maxSize: maxSizeFive,
  width: 1024,
  height: 512,
  checkFileNames: [uploadCheckFileNameData.maxLength(64), uploadCheckFileNameData.eventImage(extFilePNG)],
  ext: extFilePNG,
};

export const ctUploadEventObjectBalloonPolicy: IPolicyFileUpload = {
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(64), uploadCheckFileNameData.eventImage(extFilePAK)],
  ext: [...extFilePAK],
};
export const ctUploadEventObjectBalloonForNXPolicy: IPolicyFileUpload = {
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(64), uploadCheckFileNameData.eventImage([...extZIP])],
  ext: [...extZIP],
};

export const ctUploadEventPopupImagePolicy: IPolicyFileUpload = {
  ext: extFileDDS,
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(90), uploadCheckFileNameData.eventImage(extFileDDS)],
  width: 1024,
  height: 512,
};

export const ctUploadEventPopupImageForNXPolicy: IPolicyFileUpload = {
  ext: extFilePNG,
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(90), uploadCheckFileNameData.eventImage(extFilePNG)],
  width: 1024,
  height: 512,
};

export const ctUploadFileStartOrSuccessPopupImagePolicy: IPolicyFileUpload = {
  ext: extFileDDS,
  width: 1024,
  height: 512,
};

export const ctUploadFileIndicatorImagePolicyType1: IPolicyFileUpload = {
  ext: extFileDDS,
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(90), uploadCheckFileNameData.eventImage(extFileDDS)],
  width: 256,
  height: 256,
};
export const ctUploadFileIndicatorImageForNXPolicyType1: IPolicyFileUpload = {
  ext: extFilePNG,
  maxSize: maxSizeFive,
  checkFileNames: [uploadCheckFileNameData.maxLength(90), uploadCheckFileNameData.eventImage(extFilePNG)],
  width: 256,
  height: 256,
};

export const ctUploadFileFailOrMidPopupImagePolicy: IPolicyFileUpload = {
  // maxSize: maxSizeTwo,
  ext: extFileDDS,
  width: 1024,
  height: 512,
  // regexCheckFileName: /^.{1,116}$/,
};

export const ctUploadFileIndicatorImagePolicyType2: IPolicyFileUpload = {
  maxSize: maxSizeFive,
  ext: extFileDDS,
  width: 512,
  height: 512,
};

export const ctUploadFileIndicatorImageForNXPolicyType2: IPolicyFileUpload = {
  maxSize: maxSizeFive,
  ext: extFilePNG,
  width: 512,
  height: 512,
};

export const ctPdfUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: extFilePDF,
};

export const ctCreateTargetGroupUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeOne,
  ext: extXLSX,
};

export const ctAttachmentEmailUploadPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: extForEmailAttach,
};

export const ctUploadNationFlag: IPolicyFileUpload = {
  maxSize: maxSizeOne,
  ext: ["gif"],
  width: 100,
  height: 100,
  checkFileNames: [uploadCheckFileNameData.maxLength(50)],
};

export const ctUploadLocationMarketingScreenPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: [extJPG, extJPEG],
};

export const ctLocationImportLocationSystemSettingPolicy: IPolicyFileUpload = {
  maxSize: maxSizeTwo,
  ext: extXLSX,
};
