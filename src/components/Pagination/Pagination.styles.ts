import styled from "@emotion/styled";

export const StyledPaginationWrap = styled.nav`
  margin: 16px 0;
`;

export const StyledPaginationUl = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
`;

export const StyledPaginationLi = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface StyledPaginationButtonProps {
  active?: boolean;
}
export const StyledPaginationButton = styled.button<StyledPaginationButtonProps>`
  outline: none;
  border: none;
  border-radius: 50%;
  padding: 8px;
  width: 38px;
  height: 38px;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: ${(props) => (props.active ? "#eeeeee" : "transparent")};
  cursor: pointer;
  transition: border-color 0.25s;
  &:active {
    background-color: #bdbdbd;
  }
`;
