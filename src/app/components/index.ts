// File này chứa những đường dẫn cho các Component 
//.................................................
//.................................................
// Nếu như có Component nào mới thì cập nhật vào trong file này


//..................Common Components...................//
export { default as NavBar } from "./common/nav";
export { default as SubNav } from "./common/subNav";
export { default as None } from "./common/none";

//.................Project Components...................//

    //..................Tags Components.....................//
    export { default as NoTags } from "./project/tags/noTag";
    export { default as TagsDelete } from "./project/tags/tagsDelete";
    export { default as TagsDeleteAll } from "./project/tags/tagsDeleteAll";
    export { default as TagsEdit } from "./project/tags/tagsEdit";
    export { default as ListTag } from './project/tags/listTags'

    //.................Common Components....................//
    export { default as SideBar } from "./common/sideBar";

    //...............Folder Components - Data...............//
    export { default as ListFolder } from "./project/data/listFolder";
    export { default as NoneFolder } from "./project/data/none";
    export { default as ModalUpload } from './project/data/modalUploadFol'
    export { default as ModalNewFolder } from './project/data/modalNew'
    export { default as ModalCreateFolder } from './project/data/modalNewFolder'
    export { default as DetailFolder } from './project/data/detail/detailFolder' 
    export { default as ModalDeleteFolder } from './project/data/modalDeleteFolder'
    export { default as NoneData } from './project/data/noneData'
    export { default as MoveFolder } from './project/data/detail/moveFolder'
    export { default as EditFolder } from './project/data/detail/editFolder'
    export { default as InforFolder } from './project/data/detail/inforFolder'
    export { default as HistoryFile } from './project/data/detail/historyFile'
    export { default as ModalDeleteComment} from './project/data/modalDeleteComment'
    
    //..................Todo Components.....................//
    export { default as TodoList } from "./project/todo/todoList";
    export { default as NoneTodo } from "./project/todo/noneTodo";
    export { default as ModalNewTodo } from "./project/todo/modalNewTodo"
    export { default as DetailTodo } from "./project/todo/detailTodo"
    export { default as EditTodo } from './project/todo/editTodo'
    export { default as InfoTodo } from './project/todo/infoTodo'

    //.................Privacy Components...................//
    export { default as ProjectDetail } from "./project/project_detail/projectDetail";
    export { default as Privacy } from "./project/privacy/privacy";
    export { default as ModalDeleteProject} from "./project/project_detail/modalDeleteProject"
    export { default as ModalQuitProject} from "./project/project_detail/modalQuitProject"

    //..................Teams Components.....................//
    export { default as ListUser } from "./project/team/listUser"
    export { default as ModalInvite } from "./project/team/modalInvite"
    export { default as UserDetail } from './project/team/detailUser'

    //...................Activities Components.................//
    export { default as ListActivities } from './project/activities/listActivities' 

//...................Home Components....................//
export { default as ModalCreate } from "./home/modalCreate";
export { default as ListProject } from "./home/listProject";

//...................Login Components....................//
export { default as LoginComponent } from "./auth/login";
export { default as LoginFailed} from './auth/loginFailed'

//...................View PDF Component..................//
export {default as NavPdf} from "./project/viewPdf/navPdf"
export {default as SideNavPdf} from "./project/viewPdf/sideNavPdf"
