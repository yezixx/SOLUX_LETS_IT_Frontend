import RouteName from "../../components/routeName/RouteName";
import SideNav from "../../components/sideNav/SideNav";
import styles from "./Proj_area.module.css";
import Area from "../../components/projectFilter/Area.jsx";
import Field from "../../components/projectFilter/Field.jsx";
import SearchProjectNav from "../../components/projectFilter/SearchProjectNav.jsx";
import { AreaProvider } from "../../hooks/useArea.jsx";
import { FilterProvider } from "./FilterContext.jsx";

const sidenavCont = [
  "전체 프로젝트",
  "지역별 프로젝트",
  "분야별 프로젝트",
  "내 맞춤 프로젝트"
];
const route = ["프로젝트 찾기", "내 맞춤 프로젝트"];

const links = [
  "/projects/home",
  "/projects/area",
  "/projects/field",
  "/projects/fit"
];

const Proj_fit = () => {
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
                <Area />
                <Field />

                <div className={styles.sp}>
                  <SearchProjectNav />
                </div>
              </div>
            </AreaProvider>
          </FilterProvider>
        </div>
      </div>
    </div>
  );
};

export default Proj_fit;
