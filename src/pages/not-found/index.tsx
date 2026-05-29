import { Link } from "react-router-dom";
import { useGetReduxStores } from "@src/hooks/use-get-redux-stores";
import { EnumStoreKeys } from "@src/stores/stores.constants";
import { EnumStoresUserInfoProperties } from "@src/stores/models/stores-user-info.model";
import { pathConstants } from "@src/router/path.constants";
const NotFoundPage: React.FC = () => {
  const userInforStore = useGetReduxStores(EnumStoreKeys.USER_INFO);
  const id = userInforStore?.getData(EnumStoresUserInfoProperties.ID);
  const title = userInforStore?.getData(EnumStoresUserInfoProperties.TITLE);
  console.log(id, title);
  userInforStore?.setData({
    [EnumStoresUserInfoProperties.ID]: 9,
    [EnumStoresUserInfoProperties.TITLE]: "ok9",
  });
  const newId = userInforStore?.getData(EnumStoresUserInfoProperties.ID);
  const newTitle = userInforStore?.getData(EnumStoresUserInfoProperties.TITLE);
  console.log(newId, newTitle);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Link
        to={pathConstants.HOME}
        className="text-blue-500 hover:text-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
