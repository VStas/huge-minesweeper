import { observer } from 'mobx-react-lite';
import React from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { field } from '../../store/GameField';
import { cn as createCn } from '@bem-react/classname'

// import {field} from '../../store/GameField';

// export {field};

// export const GameField: React.FC = () => {
//     return (
//         <div className="Field">
//             {Array(10000).fill(undefined).map((v, i) => (
//                 <div key={i} />
//             ))}
//         </div>
//     );
// }

const cn = createCn('cell');

const Cell: React.FC<GridChildComponentProps> = observer(({ columnIndex, rowIndex, style }) => {
    const cell = field.getCell(columnIndex, rowIndex);
    return (
        <div
            className={cn()}
            style={style}
            onClick={() => cell.open()}
        >
            {cell.isOpen ? 'o' : 'c'}
        </div>
    );
});

export const GameField: React.FC = () => (
    <Grid
      className="Grid"
      columnCount={10000}
      columnWidth={16}
      height={600}
      rowCount={10000}
      rowHeight={16}
      width={800}
    >
      {Cell}
    </Grid>
  );