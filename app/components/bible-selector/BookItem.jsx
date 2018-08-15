import { React, PropTypes, cx } from 'app/bootstrap'; // eslint-disable-line

export const PropType_BookItem = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  chapterCount: PropTypes.number,
});

const BookItem = ({ book, listStyle, highlighted, onClick }) => {
  return (
    <li className={cx({ highlighted })} onClick={onClick} role="button" tabIndex="0">
      <span>
        {listStyle === 'list' ? book.name: book.nameAbbr}
      </span>
    </li>
  );
};

BookItem.propTypes = {
  book: PropType_BookItem.isRequired,
  highlighted: PropTypes.bool,
  onClick: PropTypes.func,
};

BookItem.defaultProps = {
  highlighted: false,
  onClick: () => {},
};

export default BookItem;
