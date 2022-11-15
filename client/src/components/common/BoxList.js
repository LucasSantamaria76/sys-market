import styled from '@emotion/styled';

export const BoxList = styled.div`
  background-color: white;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
  padding: 5px 4px 5px 5px;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ mh }) => mh && `max-height: ${mh};`};

  &::-webkit-scrollbar {
    height: 2px;
    width: 2px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #bbb;
  }
`;
