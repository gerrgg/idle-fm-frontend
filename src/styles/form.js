import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.md};

  outline: none;
  transition: 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

/* -----------------------------
   LABEL
----------------------------- */
export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text};
`;

/* -----------------------------
   TEXTAREA
----------------------------- */
export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.md};

  resize: vertical;
  min-height: 100px;
  outline: none;

  transition: 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

/* -----------------------------
   SELECT
----------------------------- */
export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.md};

  outline: none;
  transition: 0.15s ease;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent};
  }
`;

/* -----------------------------
   FORM GROUP
   (label + input stack)
----------------------------- */
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/* -----------------------------
   FORM ROW (side by side fields)
----------------------------- */
export const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};

  & > * {
    flex: 1;
  }
`;

/* -----------------------------
   CHECKBOX
----------------------------- */
export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  cursor: pointer;

  accent-color: ${({ theme }) => theme.colors.accent};
`;

/* -----------------------------
   TOGGLE SWITCH
----------------------------- */
export const ToggleWrapper = styled.label`
  position: relative;
  width: 42px;
  height: 22px;
  display: inline-block;
  cursor: pointer;
`;

export const ToggleInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: ${({ theme }) => theme.colors.accent};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  inset: 0;

  background: ${({ theme }) => theme.colors.surface3};
  border-radius: 22px;
  transition: 0.25s ease;

  &:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    left: 2px;
    top: 2px;

    background: ${({ theme }) => theme.colors.bg};
    border-radius: 50%;
    transition: 0.25s ease;
  }
`;
