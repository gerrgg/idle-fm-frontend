import styled from "styled-components";
import {
  Input as BaseInput,
  Textarea as BaseTextarea,
} from "../../../styles/form";
import { Button } from "../../../styles/button";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-end;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Input = styled.input`
  font-size: 100px;
  background: transparent;
  border: unset;
  color: ${({ theme }) => theme.colors.text};
  outline: 0;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.sm};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.sm};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

export const Textarea = styled(BaseTextarea)`
  min-height: 100px;
`;

export const SaveButton = styled(Button)`
  margin-top: 10px;
`;

export const LeftImage = styled.div`
  width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PlaceholderImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.5;
`;
