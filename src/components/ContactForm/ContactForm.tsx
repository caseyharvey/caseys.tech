import React, { useState } from 'react'
import './contact-form.sass'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const ContactForm: React.FC = () => {
  const { register, handleSubmit, errors, reset } = useForm()

  interface SeverState {
    submitting: boolean
    status?: {
      success: boolean
      message: string
    }
  }

  const [serverState, setServerState] = useState<SeverState>({
    submitting: false,
    status: undefined,
  })

  const handleServerResponse = (success: boolean, message: string) => {
    setServerState({
      submitting: false,
      status: { success, message },
    })
    if (success) {
      reset()
    }
  }

  const onSubmit = (data: any) => {
    setServerState({ submitting: true })
    axios({
      method: 'POST',
      url: 'https://formspree.io/xgezeega',
      data,
    })
      .then(() => {
        handleServerResponse(true, 'Message received')
      })
      .catch(error => {
        console.log(error.response)
        handleServerResponse(
          false,
          'Sorry, something went wrong. Please click on the email link at the top of the page or copy my email to contact me'
        )
      })
  }

  return (
    <div className="form-container">
      <div className="info-text">send me an email</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          type="text"
          autoComplete="off"
          placeholder="Name"
          className="contact-name"
          ref={register({ required: true, maxLength: 80 })}
        />
        {errors.name && errors.name.type === 'required' && (
          <span className="error">This field is required</span>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <span className="error"> only 80 characters allowed</span>
        )}
        <input
          type="text"
          name="email"
          autoComplete="off"
          placeholder="Email"
          className="contact-email"
          ref={register({
            required: true,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <span className="error">This field is required</span>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <span className="error">please enter a valid email</span>
        )}
        <textarea
          rows={8}
          name="message"
          autoCorrect="off"
          autoComplete="off"
          placeholder="Message"
          className="contact-message"
          ref={register({ required: true, maxLength: 500 })}
        />
        {errors.message && errors.message.type === 'required' && (
          <span className="error">This field is required</span>
        )}
        {errors.message && errors.message.type === 'maxLength' && (
          <span className="error"> only 500 characters allowed</span>
        )}

        <input
          className="submit"
          disabled={serverState.submitting}
          type="submit"
        />
        {serverState.status && (
          <span className={!serverState.status.success ? 'error' : 'msg-sent'}>
            {serverState.status.message}
          </span>
        )}
      </form>
    </div>
  )
}

export default ContactForm
