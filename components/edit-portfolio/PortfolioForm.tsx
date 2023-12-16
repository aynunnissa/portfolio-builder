'use client';

import { client } from '@/lib/client';
import { IResponse } from '@/types/client';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import useInput from '@/hooks/use-input';
import { IPortfolio } from '@/types/user';

// const notEmptyValidation = /^[a-zA-Z0-9\s]*$/;

const PortfolioForm = ({ portfolio }: { portfolio: IPortfolio }) => {
  const isInitialLoad = useRef(true);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    defaultValueHandler: setDefaultName,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredPosition,
    isValid: enteredPositionIsValid,
    hasError: positionInputHasError,
    valueChangeHandler: positionChangedHandler,
    defaultValueHandler: setDefaultPosition,
    inputBlurHandler: positionBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredCompany,
    isValid: enteredCompanyIsValid,
    hasError: companyInputHasError,
    valueChangeHandler: companyChangedHandler,
    defaultValueHandler: setDefaultCompany,
    inputBlurHandler: companyBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredStartDate,
    isValid: enteredStartDateIsValid,
    hasError: startDateInputHasError,
    valueChangeHandler: startDateChangedHandler,
    defaultValueHandler: setDefaultStartDate,
    inputBlurHandler: startDateBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredEndDate,
    isValid: enteredEndDateIsValid,
    hasError: endDateInputHasError,
    valueChangeHandler: endDateChangedHandler,
    defaultValueHandler: setDefaultEndDate,
    inputBlurHandler: endDateBlurHandler,
  } = useInput((value: string) => value !== '');

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangedHandler,
    defaultValueHandler: setDefaultDesc,
    inputBlurHandler: descBlurHandler,
  } = useInput((value: string) => value !== '');

  useEffect(() => {
    if (isInitialLoad.current && portfolio) {
      setDefaultName(portfolio.name);
      setDefaultPosition(portfolio.position);
      setDefaultCompany(portfolio.company);
      setDefaultStartDate(portfolio.startDate);
      setDefaultEndDate(portfolio.endDate);
      setDefaultDesc(portfolio.description);
      isInitialLoad.current = false;
    }
  }, [
    portfolio,
    setDefaultCompany,
    setDefaultDesc,
    setDefaultEndDate,
    setDefaultName,
    setDefaultPosition,
    setDefaultStartDate,
  ]);

  return (
    <div>
      <h4 className="text-bold text-underline">Profile</h4>
      <form className="portolio-form mt-4">
        <div className="flex flex-col gap-y-4">
          <div className="portfolio-field">
            <input
              type="text"
              id="portfolio-name"
              className="form-input"
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              placeholder="Nama"
              required
            />
            {nameInputHasError && (
              <p className="text-red-800">Nama harus diisi</p>
            )}
          </div>
          <div className="portfolio-field">
            <input
              type="text"
              id="portfolio-position"
              className="form-input"
              onChange={positionChangedHandler}
              onBlur={positionBlurHandler}
              value={enteredPosition}
              placeholder="Posisi"
              required
            />
            {positionInputHasError && (
              <p className="text-red-800">Position harus diisi</p>
            )}
          </div>
          <div className="portfolio-field">
            <input
              type="text"
              id="portfolio-company"
              className="form-input"
              onChange={companyChangedHandler}
              onBlur={companyBlurHandler}
              value={enteredCompany}
              placeholder="Perusahaan"
              required
            />
            {companyInputHasError && (
              <p className="text-red-800">Perusahaan harus diisi</p>
            )}
          </div>
          <div className="portfolio-field">
            <input
              type="date"
              id="portfolio-start-date"
              className="form-input"
              onChange={startDateChangedHandler}
              onBlur={startDateBlurHandler}
              value={enteredStartDate}
              placeholder="Tanggal Mulai"
              required
            />
            {startDateInputHasError && (
              <p className="text-red-800">Tanggal Mulai harus diisi</p>
            )}
          </div>
          <div className="portfolio-field">
            <input
              type="date"
              id="portfolio-end-date"
              className="form-input"
              onChange={endDateChangedHandler}
              onBlur={endDateBlurHandler}
              value={enteredEndDate}
              placeholder="Tanggal Selesai"
              required
            />
            {endDateInputHasError && (
              <p className="text-red-800">Tanggal Selesai harus diisi</p>
            )}
          </div>
          <div className="portfolio-field">
            <textarea
              id="portfolio-desc"
              className="form-input"
              onChange={descChangedHandler}
              onBlur={descBlurHandler}
              placeholder="Deskripsi"
              value={enteredDesc}
              rows={4}
              required
            ></textarea>
            {descInputHasError && (
              <p className="text-red-800">Deskripsi harus diisi</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`mt-5 btn btn-md ${
            isSubmitting ? 'btn-disabled' : 'btn-primary'
          }`}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default PortfolioForm;
