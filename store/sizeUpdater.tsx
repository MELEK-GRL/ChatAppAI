// src/components/SizeUpdater.tsx

import  { useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateSize } from '../store/reducers/sizeReducer';

const SizeUpdater = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    const isPad = Platform.OS === 'ios' && (width >= 768 && height >= 1024);

    dispatch(updateSize({ width, height, isPad }));

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newIsPad = Platform.OS === 'ios' && (window.width >= 768 && window.height >= 1024);
      dispatch(updateSize({ width: window.width, height: window.height, isPad: newIsPad }));
    });

    return () => subscription?.remove();
  }, [dispatch]);

  return null;
};

export default SizeUpdater;
