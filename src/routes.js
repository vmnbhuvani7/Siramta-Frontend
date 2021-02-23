import Home from './Components/Home/Home';
import MongodbCluster from './Components/MongodbCluster/MongodbCluster';
import MySqlCluster from './Components/MySqlCluster/MySqlCluster';
import PostgreSqlCluster from './Components/PostgreSqlCluster/PostgreSqlCluster';
import MongodbClusterDetail from "./Components/MongodbCluster/MongodbClusterDetail";
import PostgreSqlClusterDetail from "./Components/PostgreSqlCluster/PostgreSqlClusterDetail";
import MySqlClusterDetail from "./Components/MySqlCluster/MySqlClusterDetail";


export const routes = [
  { path: '/', name: "home", component: Home, exact: true },
  { path: '/mongodb-cluster', name: "MongodbCluster", component: MongodbCluster },
  { path: '/mysql-cluster', name: "MySqlCluster", component: MySqlCluster },
  { path: '/postgreSql-cluster', name: "PostgreSqlCluster", component: PostgreSqlCluster },
  { path: '/cluster-detail/:id', name: "ClusterDetail", component: MongodbClusterDetail },
  { path: '/PostgreSQL-detail/:id', name: "ClusterDetail", component: PostgreSqlClusterDetail },
  { path: '/MySQL-detail/:id', name: "ClusterDetail", component: MySqlClusterDetail },
]