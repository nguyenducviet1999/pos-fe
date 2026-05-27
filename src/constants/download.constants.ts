import dayjs from "dayjs";

import { FORMAT_DATE } from "@src/utils";
// get download file name off tournament detail
const getDownloadFileNameTournamentDetail = (tournamentName: string) =>
  `${tournamentName ?? ""}_Detail_Info_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off league detail
const getDownloadFileNameLeagueDetail = (leagueName: string) =>
  `${leagueName ?? ""}_Detail_Info_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off roulette detail
const getDownloadFileNameRouletteDetail = (rouletteName: string) =>
  `${rouletteName ?? ""}_Detail_Info_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
//  get download file name off balloon detail
const getDownloadFileNameBalloonDetail = (eventName: string) =>
  `${eventName ?? ""}_Balloon_Detail_Info_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off brand zone statistic
const getDownloadFileNameBrandZoneStatistic = (eventName: string) =>
  `${eventName ?? ""}_Brand_Zone_Statistic_Info_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off brand zone winner list
const getDownloadFileNameBrandZoneWinnerList = (eventName: string) =>
  `${eventName ?? ""}_Brand_Zone_Winner_List_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off hole in one list
const getDownloadFileNameHoleInOneList = () =>
  `Event_Hole_In_One_List_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off push list
const getDownloadFileNamePushList = () =>
  `Push_List_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;
// get download file name off location list
const getDownloadFileNameLocationList = () =>
  `Location_List_${dayjs().format(FORMAT_DATE.FILE_DOWNLOAD)}`;

export const downloadConst = {
  getDownloadFileNameTournamentDetail,
  getDownloadFileNameLeagueDetail,
  getDownloadFileNameRouletteDetail,
  getDownloadFileNameBalloonDetail,
  getDownloadFileNameBrandZoneStatistic,
  getDownloadFileNameBrandZoneWinnerList,
  getDownloadFileNameHoleInOneList,
  getDownloadFileNamePushList,
  getDownloadFileNameLocationList,
};
