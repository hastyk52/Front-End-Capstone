/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { reduce } from 'lodash';
import React, { useState, useEffect } from 'react';
import Modal from '../Helpers/Modal';

const AddAnswer = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [errors, setErrors] = useState(' ');
  const [answer, setAnswer] = useState({
    question_id: props.question_id,
    name: '',
    email: '',
    body: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswer({ ...answer, [name]: value });
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      setAnswer({
        ...answer,
        name: answer.name,
        email: answer.email,
        body: answer.body,
      });
      console.log(answer);
      setAnswer({
        ...answer,
        name: '',
        email: '',
        body: '',
      });
      setErrors(' ');
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    // returns boolean
    let errors = '';
    if (!answer.name) {
      errors += 'Nickname required \n';
    }
    if (!answer.email || validateEmail(answer.email) === false) {
      errors += 'Valid email required \n';
    }
    if (!answer.body) {
      errors += 'Answer required \n';
    }
    // console.log(errors);
    setErrors(errors);
    return !errors;
  };

  return (
    <div>
      <div
        style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        Add Answer
      </div>
      <Modal isOpen={isOpen} close={() => setOpen(false)}>
        {/* Header     */}
        <h2>Submit Your Answer</h2>
        <div>“[Product Name]: [Question Body]” AS A SUBTITLE</div>
        <br />
        {/* Name     */}
        <label>What is your nickname:</label>
        <input
          name="name"
          type="text"
          style={{ width: '35%' }}
          onChange={handleInputChange}
          value={answer.name}
          maxLength={60}
          placeholder="Example: jack543!"
        />
        <div>For privacy reasons, do not use your full name or email address</div>
        <br />
        {/* Email     */}
        <label>Email:</label>
        <input
          name="email"
          type="text"
          style={{ width: '35%' }}
          onChange={handleInputChange}
          value={answer.email}
          maxLength={60}
          placeholder="Example: jack@email.com"
        />
        <div>For authentication reasons, you will not be emailed</div>
        {/* Answer     */}
        <br />
        <label>Your Answer:</label>
        <input
          name="body"
          type="text"
          style={{ width: '35%', height: '300px' }}
          onChange={handleInputChange}
          value={answer.body}
          maxLength={1000}
        />
        <button onClick={handleSubmit} type="button" style={{ width: '35%' }}>
          Submit
        </button>

        <div style={{ visibility: errors === ' ' ? 'hidden' : 'visible', color: 'red', whiteSpace: 'pre' }}>
          Please enter the following:
          <br />
          { errors }
        </div>
      </Modal>
    </div>
  );
};

export default AddAnswer;
