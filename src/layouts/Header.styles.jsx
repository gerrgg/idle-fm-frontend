import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  width: 100%;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
`;

export const LogoutButton = styled.button`
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accentAlt};
  }
`;

export const AddPlaylistButton = styled(Link)`
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accentAlt};
  }
`;
