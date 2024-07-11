import leftArrow from 'assets/icons/left-arrow.svg';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Text } from 'components/Text';
import { MAPS_API_KEY } from 'constants/env';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import { ConfirmAddressModal } from './components/ConfirmAddressModal';
import styles from './styles.module.scss';

export const SelectAddressModal = ({ visible, onOpen, onClose, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [confirmAddressModalVisible, setConfirmAddressModalVisible] = useState(false);
  const [draftAddress, setDraftAddress] = useState({});
  const { getPlacePredictions, placePredictions, placesService } = usePlacesService({
    apiKey: MAPS_API_KEY,
    options: {
      types: [],
    },
  });

  useEffect(() => {
    setInputValue('');
  }, [onOpen]);

  useEffect(() => {
    getPlacePredictions({ input: inputValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const openConfirmAddressModal = () => {
    setConfirmAddressModalVisible(true);
  };

  const closeConfirmAddressModal = () => {
    setConfirmAddressModalVisible(false);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const createDraftAddress = placeDetails => {
    const reducedObject = placeDetails.address_components.reduce((acc, obj) => {
      if (obj.types.includes('street_number')) {
        acc.streetNumber = obj.long_name;
      }

      if (obj.types.includes('route')) {
        acc.streetName = obj.long_name;
      }

      if (obj.types.includes('locality')) {
        acc.suburb = obj.long_name;
      }

      if (obj.types.includes('administrative_area_level_1')) {
        acc.state = obj.short_name;
      }

      if (obj.types.includes('postal_code')) {
        acc.postcode = +obj.long_name;
      }

      if (obj.types.includes('country')) {
        acc.countryCode = obj.short_name;
      }

      return acc;
    }, {});

    setDraftAddress(reducedObject);
  };

  const handlePlacePredictionClick = id => {
    placesService?.getDetails(
      {
        placeId: id,
        fields: ['formatted_address', 'address_components'],
        language: 'en-AU',
      },
      placeDetails => {
        createDraftAddress(placeDetails);
        onClose();
        openConfirmAddressModal();
      },
    );
  };

  return (
    <>
      <Modal visible={visible} className={styles['select-address-modal']}>
        <div className={styles['select-address-modal__container']}>
          <div className={styles['select-address-modal__header']}>
            <button type="button" onClick={onClose}>
              <img src={leftArrow} alt="left-arrow" />
            </button>
            <Input
              className={styles['select-address-modal__input']}
              placeholder="Search address"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          {placePredictions.map((placePrediction, index) => {
            const className =
              index === 0
                ? styles['select-address-modal__place-prediction-first-text']
                : styles['select-address-modal__place-prediction-text'];

            return (
              <button
                type="button"
                key={placePrediction.place_id}
                className={styles['select-address-modal__place-prediction']}
                onClick={() => handlePlacePredictionClick(placePrediction.place_id)}
              >
                <Text type="p3" className={className}>
                  {placePrediction.description}
                </Text>
              </button>
            );
          })}
        </div>
      </Modal>
      {confirmAddressModalVisible && (
        <ConfirmAddressModal
          visible
          openSelectAddressModal={onOpen}
          closeSelectAddressModal={onClose}
          onClose={closeConfirmAddressModal}
          draftAddress={draftAddress}
          onSelect={onSelect}
        />
      )}
    </>
  );
};

SelectAddressModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
