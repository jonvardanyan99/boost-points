import React, { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import leftArrow from '~/assets/icons/left-arrow.svg';
import { Input } from '~/components/Input';
import { Modal } from '~/components/Modal';
import { Text } from '~/components/Text';
import { MAPS_API_KEY } from '~/constants/env';
import { ConfirmAddressModalFormValues } from '~/types/formValues';
import { DraftAddress } from '~/types/models';

import { ConfirmAddressModal } from './components/ConfirmAddressModal';
import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (addressData: ConfirmAddressModalFormValues) => void;
}

export const SelectAddressModal: React.FC<Props> = ({ visible, onOpen, onClose, onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [confirmAddressModalVisible, setConfirmAddressModalVisible] = useState(false);
  const [draftAddress, setDraftAddress] = useState<DraftAddress>({
    streetNumber: '',
    streetName: '',
    suburb: '',
    state: '',
    postcode: '',
    countryCode: '',
  });
  const { getPlacePredictions, placePredictions, placesService } = usePlacesService({
    apiKey: MAPS_API_KEY as string,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const createDraftAddress = (
    placeDetails: Parameters<Parameters<PlacesService['getDetails']>[1]>[0],
  ) => {
    const initialValues: DraftAddress = {
      streetNumber: '',
      streetName: '',
      suburb: '',
      state: '',
      postcode: '',
      countryCode: '',
    };

    const reducedObject = placeDetails.address_components.reduce<DraftAddress>((acc, obj) => {
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
        acc.postcode = obj.long_name;
      }

      if (obj.types.includes('country')) {
        acc.countryCode = obj.short_name;
      }

      return acc;
    }, initialValues);

    setDraftAddress(reducedObject);
  };

  const handlePlacePredictionClick = (id: (typeof placePredictions)[number]['place_id']) => {
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
      <Modal className={styles['select-address-modal']} visible={visible}>
        <div className={styles['select-address-modal__container']}>
          <div className={styles['select-address-modal__header']}>
            <button type="button" onClick={onClose}>
              <img alt="left-arrow" src={leftArrow} />
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
                className={styles['select-address-modal__place-prediction']}
                key={placePrediction.place_id}
                type="button"
                onClick={() => handlePlacePredictionClick(placePrediction.place_id)}
              >
                <Text className={className} type="p3">
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
          closeSelectAddressModal={onClose}
          draftAddress={draftAddress}
          openSelectAddressModal={onOpen}
          onClose={closeConfirmAddressModal}
          onSelect={onSelect}
        />
      )}
    </>
  );
};
