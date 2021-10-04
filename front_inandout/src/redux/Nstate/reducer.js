const initialState = {
    // defaultOpenKeys:['1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6']
    defaultOpenKeys: []
}

const reducer = (state = initialState, action) => {
    if (action.type === '내 정보') {
        return {
            ...state,
            defaultOpenKeys: ['sub2']
        }
    } else if (action.type === '내 근무') {
        return {
            ...state,
            defaultOpenKeys: ['sub3']
        }
    } else if (action.type === '의원 관리') {
        return {
            ...state,
            defaultOpenKeys: ['sub4']
        }
    } else if (action.type === '사원 관리') {
        return {
            ...state,
            defaultOpenKeys: ['sub5']
        }
    } else if (action.type === '공지사항') {
        return {
            ...state,
            defaultOpenKeys: ['sub6']
        }
    } else if (action.type === '의원 정보') {
        return {
            ...state,
            defaultOpenKeys: ['sub4']
        }
    } else {
        return {
            ...state,
            defaultOpenKeys: []
        }
    }
}

export default reducer