import "styled-components";

declare module "styled-components" {
    // 스타일드 컴포넌트 모듈을 선언할거임
export interface DefaultTheme {
    // DefaultTheme 라는 interface 를 만듬
    bgColor: string;
    boardColor: string;
    cardColor : string;
    //DefaultTheme가 갖는 속성
}}