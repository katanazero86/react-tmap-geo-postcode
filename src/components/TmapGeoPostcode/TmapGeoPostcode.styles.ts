import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface StyledButtonProps {
  wFull?: boolean;
}
export const StyledButton = styled.button<StyledButtonProps>`
  padding: 8px 16px;
  background-color: #3f51b5;
  outline: none;
  border: none;
  color: white;
  font-size: 0.875rem;
  border-radius: 4px;
  font-weight: 400;
  width: ${(props) => (props.wFull ? "100%" : "auto")};
  height: 42px;
  cursor: pointer;
`;

interface StyledModalWrapProps {
  isOpen?: boolean;
}
export const StyledModalWrap = styled.div<StyledModalWrapProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
`;

export const StyledModal = styled.div`
  margin: 18px;
  box-sizing: border-box;
  width: 600px;
  padding: 28px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
`;

export const StyledModalTitle = styled.h2`
  letter-spacing: -0.5px;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: left;
  margin: 0;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledModalForm = styled.form`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding-bottom: 16px;
`;

export const StyledInputWrap = styled.div`
  position: relative;
  flex-grow: 1;
`;

export const StyledInputLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.75rem;
  color: #999999;
`;

export const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #dedede;
  outline: none;
  height: 32px;
  margin-top: 22px;
  padding: 0;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border-color: #7986cb;
    + label {
      color: #7986cb;
    }
  }
`;

export const StyledResultTotalCount = styled.p`
  font-size: 0.825rem;
  margin-top: 0;
  margin-bottom: 16px;
  text-align: left;
`;

export const StyledModalBody = styled.div`
  overflow-y: auto;
  max-height: 600px;
  height: 600px;
`;

export const StyledTip = styled.div`
  padding: 10px;
  text-align: left;
  font-size: 0.825rem;
  letter-spacing: -0.5px;
  height: 600px;
  box-sizing: border-box;
`;

export const StyledTupExample = styled.span`
  color: #008bd3;
`;

export const StyledModalTable = styled.table`
  width: 100%;
  max-height: 600px;
  border-spacing: 0;
`;

export const StyledTh = styled.th`
  background: #f9f9f9;
  border-top: 2px #7986cb solid;
  border-bottom: 1px #e6ebf1 solid;
  padding: 14px;
  &:first-of-type {
    width: 60%;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
export const StyledTr = styled.tr`
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease;
  &:hover {
    background-color: #fafafa;
  }
`;

export const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px #e6ebf1 solid;
  font-size: 0.825rem;
  cursor: pointer;
  letter-spacing: -0.5px;
  height: 50px;
`;
