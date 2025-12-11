import styled from "styled-components";
import {
  Input as BaseInput,
  Textarea as BaseTextarea,
} from "../../../styles/form";
import { Button } from "../../../styles/button";
import { Col } from "../../../styles/layout";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-end;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 24px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: ${({ theme }) => theme.space.sm} 0;
  margin: ${({ theme }) => theme.space.sm} 0;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.sm};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }

  @media (max-width: 900px) {
    font-size: 32px;
    white-space: normal;
  }
`;

export const Textarea = styled(BaseTextarea)`
  min-height: 100px;
`;

export const SaveButton = styled(Button)`
  margin-top: 10px;
`;

export const LeftImage = styled.div`
  width: 250px;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  position: relative;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: ${({ readOnly }) => (readOnly ? `none` : `pointer`)};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;

    background-image: ${({ glowsrc, theme }) =>
      glowsrc ? `url(${glowsrc})` : theme.colors.accent};

    background-size: cover;
    background-position: center;

    filter: blur(40px) saturate(2) brightness(0.7);
    transform: scale(2.6);
    opacity: 0.9;
  }

  img,
  svg {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    width: 70%;
    max-width: 300px;
  }
`;

/* If Placeholder is used (no playlist.image) */
export const PlaceholderImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.6;
  z-index: 2; /* Keep on top of glow */
`;

export const TitleTagWrapper = styled(Col)`
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    width: 100%;
    align-items: stretch;
  }
`;
