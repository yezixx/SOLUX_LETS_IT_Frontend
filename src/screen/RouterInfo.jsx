import TeamLayout from "./teamboard/layout/TeamLayout";
import MemberProfile from "./teamboard/memberProfile/MemberProfile";
import TeamFeedback from "./teamboard/teamFeedback/TeamFeedback";
import UpdateProj from "./teamboard/updateProj/UpdateProj";
import ManageProj from "./teamboard/manageProj/ManageProj";
import ProjInfo from "./teamboard/projInfo/ProjInfo";
import SetMember from "./teamboard/setMember/SetMember";
import Teamboard from "./teamboard/Teamboard";
import CreateBoard from "./createBoard/CreateBoard";
import CreateProfile from "./createProfile/CreateProfile";
import MainHome from "./mainHome/MainHome";
import SearchProject from "./searchProject/SearchProject";
import Proj_area from "./searchProject/Proj_area";
import ApplyHireProj from "./myProject/applyHireProj/ApplyHireProj";
import MyProfile from "./myPage/myProfile/MyProfile";
import Proj_field from "./searchProject/Proj_field";
import Proj_fit from "./searchProject/Proj_fit";
import AttendProj from "./myProject/attendProj/AttendProj";
import Scrap from "./myProject/scrap/Scrap";
import MyPortfolio from "./myPage/myPortfolio/MyPortfolio";
import PortfolioWrite from "./myPage/myPortfolio/portfolioWrite/PortfolioWrite";
import CompletePort from "./myPage/myPortfolio/completePort/CompletePort";
import PortfolioBoard from "./myPage/myPortfolio/portfolioBoard/PortfolioBoard";
import PortfolioDetail from "./myPage/myPortfolio/portfolioDetail/PortfolioDetail";
import MainLayout from "../MainLayout";
import ProjPost_detail from "./projPostDetail/ProjPostDetail";
import ProjectHire from "./projectHire/ProjectHire";
import MyPageLayout from "./myPage/MyPageLayout";
import MyProjectLayout from "./myProject/MyProjectLayout";
import Apply from "./apply/Apply";
import APILogIn from "../screen/logIn/APILogIn";
import Redirect from "./logIn/Redirect";
import ApplyProfile from "./myProject/applyHireProj/applyProfile/ApplyProfile";
import PrivateRoute from "./PrivateRoute";

export const RouterInfo = [
  {
    element: <MainLayout />,
    children: [
      //main 화면
      {
        path: "/",
        element: <MainHome />,
        index: true
      },
      //로그인
      {
        path: "/login",
        element: <APILogIn />,
        index: true
      },
      {
        path: "/login/oauth2/callback/kakao",
        element: <Redirect />,
        index: true
      },
      //프로젝트 찾기
      {
        path: "projects/home",
        element: <SearchProject />,
        label: "프로젝트 찾기 (전체)"
      },
      {
        path: "projects/area",
        element: <Proj_area />,
        label: "지역별 찾기"
      },
      {
        path: "projects/field",
        element: <Proj_field />,
        label: "분야별 찾기"
      },
      {
        path: "projects/fit",
        element: <Proj_fit />,
        label: "맞춤 찾기"
      },
      // 구인글 작성하기
      {
        path: "projects/post",
        element: <PrivateRoute element={<ProjectHire />} />,
        label: "구인글 작성하기"
      },
      // 구인글 보기, 추후  /:id 추가 필요
      {
        path: "projects/detail/:postId",
        element: <ProjPost_detail />,
        label: "구인글 보기"
      },

      //내 프로젝트
      {
        path: "myproj",
        element: <PrivateRoute element={<MyProjectLayout />} />,
        label: "구인/신청 프로젝트",
        children: [
          {
            path: "hiring-and-applied",
            element: <PrivateRoute element={<ApplyHireProj />} />,
            label: "구인/신청 프로젝트"
          },
          {
            //백엔드 연결용 동적 주소
            path: "applyprofile/:applyId/:postId",
            // path: "applyprofile",
            element: <PrivateRoute element={<ApplyProfile />} />,
            label: "신청자 프로필"
          },
          {
            path: "attendproj",
            element: <PrivateRoute element={<AttendProj />} />,
            label: "참여 프로젝트"
          },
          {
            path: "scrap",
            element: <PrivateRoute element={<Scrap />} />,
            label: "스크랩 프로젝트"
          }
        ]
      },
      //마이페이지
      {
        path: "mypage",
        element: <PrivateRoute element={<MyPageLayout />} />,
        label: "프로필 관리",
        children: [
          {
            path: "profile",
            element: <PrivateRoute element={<MyProfile />} />,
            label: "프로필 관리"
          },
          {
            // path: "portfolio/:prjId",
            path: "portfolio",
            element: <PrivateRoute element={<MyPortfolio />} />,
            label: "포트폴리오 관리"
          },
          {
            path: "portfolio/post/:teamId",
            element: <PrivateRoute element={<PortfolioWrite />} />,
            label: "포트폴리오 작성창"
          },
          {
            path: "portfolio/post/summaryAI/:teamId",
            element: <PrivateRoute element={<CompletePort />} />,
            label: "AI 생성 - 완성된 포트폴리오"
          },
          {
            path: "portfolio/board/:teamId",
            // path: "portfolio/board",
            element: <PrivateRoute element={<PortfolioBoard />} />,
            label: "포트폴리오 게시판"
          },
          {
            path: "portfolio/board/:teamId/detail/:prtId",
            // path: "portfolio/board/detail",
            element: <PrivateRoute element={<PortfolioDetail />} />,
            label: "포트폴리오 게시판"
          }
        ]
      },

      //팀 게시판
      {
        path: "teamboard",
        element: <PrivateRoute element={<Teamboard />} />,
        label: "팀게시판",
        children: [
          {
            element: <TeamLayout />,
            children: [
              {
                index: true,
                element: <ProjInfo />,
                label: "프로젝트 정보"
              },
              {
                path: "member",
                element: <SetMember />,
                label: "팀원 설정"
              },
              {
                path: "manage",
                element: <ManageProj />,
                label: "프로젝트 관리"
              },
              {
                path: "manage/edit",
                element: <UpdateProj />,
                label: "프로젝트 정보 수정"
              },
              {
                path: "member/profile",
                element: <MemberProfile />,
                label: "팀원 프로필"
              }
            ]
          },
          {
            path: "feedback",
            element: <TeamFeedback />,
            label: "팀원 평가"
          }
        ]
      },
      {
        path: "teamboard/new",
        element: <PrivateRoute element={<CreateBoard />} />,
        label: "팀게시판 생성"
      },
      {
        path: "profile/new",
        element: <CreateProfile />,
        label: "최초 1회 프로필 생성"
      },
      //프로젝트 신청창
      {
        path: "apply/:postId",
        element: <PrivateRoute element={<Apply />} />,
        label: "프로젝트 신청창"
      }
    ]
  }
];
