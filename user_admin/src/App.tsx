import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList, UserShow, UserEdit } from "./users";
import { authProvider } from "./authProvider";


export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="user" list={UserList} show={UserShow} edit={UserEdit} recordRepresentation="name" />
  </Admin>
);
