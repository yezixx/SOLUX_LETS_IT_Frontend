import RouteName from "../../components/routeName/RouteName";
import SideNav from "../../components/sideNav/SideNav";
import styles from "./Proj_area.module.css";
import Field from "./projectFilter/Field.jsx";
import SearchProjectNav from "./projectFilter/SearchProjectNav.jsx";
import { AreaProvider } from "../../hooks/useArea.jsx";
import { FilterProvider } from "./FilterContext.jsx";

const sidenavCont = [
  "전체 프로젝트",
  "지역별 프로젝트",
  "분야별 프로젝트",
  "내 맞춤 프로젝트"
];
const route = ["프로젝트 찾기", "분야별 프로젝트"];

const links = [
  "/projects/home",
  "/projects/area",
  "/projects/field",
  "/projects/fit"
];

const Proj_field = () => {
  return (
    <div>
      <div className={styles.searchp}>
        <RouteName route={route} />
        <div className={styles.searchp__content}>
          <div className={styles.sidenav}>
            <SideNav content={sidenavCont} link={links} />
          </div>
          <FilterProvider>
            <AreaProvider>
              <div className={styles.mainContent}>
                <Field />
                <SearchProjectNav />
              </div>
            </AreaProvider>
          </FilterProvider>
        </div>
      </div>
    </div>
  );
};

export default Proj_field;
