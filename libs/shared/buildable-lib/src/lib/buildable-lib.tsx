import styles from './buildable-lib.module.scss';

export function BuildableLib() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BuildableLib!</h1>
    </div>
  );
}

export default BuildableLib;
