// /C:/Users/profe/3/week15/SecondBrain/Frontend/src/utils/localstorage.ts

export const setToken = (token: string): void => {
    localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};