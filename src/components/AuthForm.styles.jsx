import styled from "styled-components";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  z-index: 10;
  width: 100%;
  gap: 1rem;
`;

export const AuthFormGroup = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const AuthInput = styled.input`
  padding: 1rem 1rem;
  border: 1px solid ${({ theme }) => theme.muted};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

export const AuthButton = styled.button`
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.accentAlt};
  }
`;

export const AuthLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
  text-align: left;
`;

export const AuthCheckbox = styled.input`
  margin-right: 0.5rem;
`;

export const AuthCheckboxLabel = styled.label`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
  margin-right: 0.75rem;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.accent};
  }

  &:checked + span::before {
    transform: translateX(20px);
    background-color: ${({ theme }) => theme.accentAlt};
    box-shadow: 0 0 8px ${({ theme }) => theme.accentAlt}80;
  }

  &:focus + span {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentAlt}55;
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.muted};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 22px;

  &::before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.text};
    transition: transform 0.3s ease, background-color 0.3s ease,
      box-shadow 0.3s ease;
    border-radius: 50%;
  }
`;
