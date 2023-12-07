import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList, UserShow, UserEdit } from "./users";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="user" list={UserList} show={UserShow} edit={UserEdit} recordRepresentation="name" />
  </Admin>
);
