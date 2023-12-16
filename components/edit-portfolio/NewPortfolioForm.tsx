'use client';

import { useEffect, useRef, useState } from 'react';
import useInput from '@/hooks/use-input';
import { INewPortfolio } from '@/types/user';
import { useDispatch } from 'react-redux';
import { updateNewPortfolio } from '@/store/reducers/portfolio';

const NewPortfolioForm = ({
  index,
  newPortfolio,
}: {
  index: number;
  newPortfolio: INewPortfolio;
}) => {
  const isInitialLoad = useRef(true);
  const dispatch = useDispatch();

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

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field:
      | 'name'
      | 'position'
      | 'company'
      | 'startDate'
      | 'endDate'
      | 'description'
  ) => {
    const newObj = { ...newPortfolio };
    newObj[field] = event.target.value;
    dispatch(
      updateNewPortfolio({
        portfolio: newObj,
        index: index,
      })
    );
  };

  useEffect(() => {
    if (isInitialLoad.current && newPortfolio) {
      setDefaultName(newPortfolio.name);
      setDefaultPosition(newPortfolio.position);
      setDefaultCompany(newPortfolio.company);
      setDefaultStartDate(newPortfolio.startDate);
      setDefaultEndDate(newPortfolio.endDate);
      setDefaultDesc(newPortfolio.description);
      isInitialLoad.current = false;
    }
  }, [
    newPortfolio,
    setDefaultCompany,
    setDefaultDesc,
    setDefaultEndDate,
    setDefaultName,
    setDefaultPosition,
    setDefaultStartDate,
  ]);

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <div className="portfolio-field">
          <input
            type="text"
            id="portfolio-name"
            onChange={e => {
              handleChange(e, 'name');
              nameChangedHandler(e);
            }}
            className="form-input"
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
            onChange={e => {
              handleChange(e, 'position');
              positionChangedHandler(e);
            }}
            className="form-input"
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
            onChange={e => {
              handleChange(e, 'company');
              companyChangedHandler(e);
            }}
            className="form-input"
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
            onChange={e => {
              handleChange(e, 'startDate');
              startDateChangedHandler(e);
            }}
            className="form-input"
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
            onChange={e => {
              handleChange(e, 'endDate');
              endDateChangedHandler(e);
            }}
            className="form-input"
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
            onChange={e => {
              handleChange(e, 'description');
              descChangedHandler(e);
            }}
            className="form-input"
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
    </div>
  );
};

export default NewPortfolioForm;
