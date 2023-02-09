// import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import initialState from './initialState';
import useForm from '../../shared/hooks/useForm';

const ContactForm = ({onSubmit}) => {
  
  const { state, handleChange, handleSubmit }  = useForm({
    initialState, onSubmit
  });
  
  const { name, number } = state; 

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  // handleSubmit = evt => {
  //   evt.preventDefault();
  //   const { onSubmit } = this.props;
  //   const data = onSubmit({ ...this.state });
  //   // console.log(data);
  //   // this.reset();
  //   if (data) {
  //     this.reset();
  //   }
  // };

  // reset() {
  //   this.setState({ name: '', number: '' });
  // }

  return (
      
      <div className={css.wrapper}>
        <div className={css.contactFormBlock}>
          <form onSubmit={handleSubmit}>
            <div className={css.container}>
              <label className={css.label} htmlFor={name}>
                Name
              </label>
              <input
                className={css.input}
                value={name}
                onChange={handleChange}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                id={name}
              />
            </div>
            <div className={css.container}>
              <label className={css.label} htmlFor={number}>
                Phone Number
              </label>
              <input
                className={css.input}
                value={number}
                onChange={handleChange}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </div>
            <button className={css.btnContactAdd} type="submit">
              Add contact
            </button>
          </form>
        </div>
      </div>
    );
  }


export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  };
