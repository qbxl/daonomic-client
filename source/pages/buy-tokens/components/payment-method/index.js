import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import Panel from '@daonomic/ui/source/panel';
import Select from '@daonomic/ui/source/select';
import Translation from '~/components/translation';
import Heading from '~/components/heading';
import textStyles from '~/components/text/text.css';
import styles from './payment-method.css';
import { sale } from '~/config/common';

const paymentMethodShape = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  address: PropTypes.string,
});

@inject(({ payment, kyc }) => ({
  walletAddress: kyc.formData.get('address'),
  selectedPaymentMethod: payment.selectedMethod,
  selectedPaymentMethodAddress: payment.selectedMethodAddress,
  selectedPaymentMethodAddressQRCode: payment.selectedMethodAddressQRCode,
  selectedPaymentMethodPayments: payment.selectedMethodPayments,
  paymentMethods: payment.methods,
  onChangePaymentMethod: payment.setMethod,
}))
@observer
export default class PaymentMethod extends Component {
  static propTypes = {
    walletAddress: PropTypes.string.isRequired,
    selectedPaymentMethod: paymentMethodShape.isRequired,
    selectedPaymentMethodAddress: PropTypes.string,
    selectedPaymentMethodPayments: MobxPropTypes.arrayOrObservableArrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      }),
    ).isRequired,
    selectedPaymentMethodAddressQRCode: PropTypes.string,
    paymentMethods: MobxPropTypes.observableArrayOf(paymentMethodShape)
      .isRequired,
    onChangePaymentMethod: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedPaymentMethodAddress: '',
    selectedPaymentMethodAddressQRCode: '',
  };

  handleChangePaymentMethod = (event) => {
    this.props.onChangePaymentMethod(event.target.value);
  };

  renderSelectedPaymentMethodAddress = () => (
    <div className={styles['payment-method-address']}>
      {this.renderQRCode()}
      <div>
        <Translation
          id="paymentMethods:sendFundsTo"
          data={{
            paymentMethod: 'Ethereum',
          }}
        />
        <div className={textStyles['word-break-all']}>{sale}</div>
      </div>
    </div>
  );

  renderQRCode = () => {
    const { selectedPaymentMethodAddressQRCode } = this.props;

    if (!selectedPaymentMethodAddressQRCode) {
      return null;
    }

    return (
      <img
        className={styles.qrcode}
        src={selectedPaymentMethodAddressQRCode}
        alt="qrcode"
      />
    );
  };

  renderInstruction = () => {
    const { walletAddress } = this.props;

    return (
      <Fragment>
        <Heading tagName="h3" size="small">
          <Translation id="paymentMethods:instructionTitle" />
        </Heading>

        <div>
          <Translation id="paymentMethods:instructionText" />
          <div className={textStyles['word-break-all']}>{walletAddress}</div>
        </div>
      </Fragment>
    );
  };

  renderPaymentStatus = (payment) => {
    switch (payment.status) {
      case 'COMPLETED': {
        return 'finished';
      }

      case 'ERROR': {
        return 'error';
      }

      default: {
        return 'pending';
      }
    }
  };

  render = () => (
    <Panel paddingSize="large">
      <Heading className={styles.title} tagName="h2" size="normal">
        <Translation id="paymentMethods:title" />
      </Heading>

      {this.renderSelectedPaymentMethodAddress()}
      <Panel.Separator />
      {this.renderInstruction()}
    </Panel>
  );
}
