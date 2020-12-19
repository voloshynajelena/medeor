interface State {
    user: UserState;
}

interface UserState {
    user: UserStateId;
}

interface UserStateId {
    id: string;
}
