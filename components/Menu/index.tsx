import React, { FC, useCallback } from 'react';
import styled from '@emotion/native';
import { Pressable } from 'react-native';

interface Props {
  style: any;
  show: boolean;
  onCloseModal: (e: any) => void;
  closeButton?: boolean;
}
const Menu: FC<Props> = ({ style, closeButton, children, onCloseModal, show }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  if (!show) return null;
  return (
    <Pressable onPress={onCloseModal}>
      <CreateMenu onPress={stopPropagation} style={style}>
        {closeButton && <CloseModalButton title="&times;" onPress={onCloseModal} />}
        {children}
      </CreateMenu>
    </Pressable>
  );
};

const CreateMenu = styled.TouchableOpacity`
  //position: absolute;
  //top: 0;
  //right: 0;
  //left: 0;
  //bottom: 0;
  //z-index: 1000;
  //& > div {
  //  position: absolute;
  //  display: inline-block;
  //  background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
  //border-radius: 6px;
  //  user-select: none;
  //  min-width: 360px;
  //  z-index: 512;
  //  max-height: calc(100vh - 20px);
  //  color: rgb(29, 28, 29);
  //}
`;

const CloseModalButton = styled.Button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

export default Menu;
