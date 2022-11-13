import { Navigate, NavLink, Outlet, useParams, useRoutes } from 'react-router-dom';
import './App.css';

const AppLayout = () => {
  return (
    <>
      <h1>App Layout</h1>
      <NavLink to="users">Users List</NavLink>
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <h1>Main Page</h1>
    </>
  );
};

const UsersLayout = () => {
  return (
    <>
      <h1>Users Layout</h1>
      <NavLink to="/">Main Page</NavLink>
      <Outlet />
    </>
  );
};

const UsersListPage = () => {
  const users = ['1', '2', '3', '4', '5', '6'];
  return (
    <>
      <h1>Users List Page</h1>
      <ul>
        {users.map((el) => (
          <li>
            <NavLink key={el} to={el}>
              User {el}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h1>User Page</h1>
      <ul>
        <li>
          <NavLink to="/users">Users List</NavLink>
        </li>
        <li>
          <NavLink to="edit" end>
            User Edit Page
          </NavLink>
        </li>
      </ul>
      <span>
        User Id: <h1>{userId}</h1>
      </span>
    </>
  );
};

const UserEditPage = () => {
  const userId = Number(useParams().userId);

  return (
    <>
      <h1>User Edit Page</h1>
      <ul>
        <li>
          <NavLink to={`../${userId}`}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={`../${userId + 1}`}>Another User</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users List</NavLink>
        </li>
      </ul>
    </>
  );
};

const routes = [
  { path: '/', element: <MainPage /> },
  {
    path: 'users',
    element: <UsersLayout />,
    children: [
      { path: '', element: <UsersListPage /> },
      { path: ':userId/edit', element: <UserEditPage /> },
      {
        path: ':userId',
        element: <UserPage />,
      },
    ],
  },
  { path: '*', element: <Navigate to="/" /> },
];

function App() {
  const elements = useRoutes(routes);
  return (
    <>
      <AppLayout />
      {elements}
    </>
  );
}

export default App;
