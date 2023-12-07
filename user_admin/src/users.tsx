import { Datagrid, EmailField, List, TextField, SimpleShowLayout, Show, Edit, SimpleForm, TextInput } from 'react-admin';


const userFilters = [
    <TextInput source="name" label="Search" alwaysOn />
];


export const UserList = () => (
    <List filters={userFilters}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="hashed_password" />
        </Datagrid>
    </List>
);

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="hashed_password" />
        </SimpleShowLayout>
    </Show>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="hashed_password" />
        </SimpleForm>
    </Edit>
);