import React from 'react'
import { Link } from "react-router-dom";
import { Tooltip } from 'antd';
import ImageWithBasePath from '../../img/imagewithbasebath';

interface Props {
  onExportPdf: () => void;
  onExportExcel: () => void;
}

const TooltipIcons: React.FC<Props> = ({ onExportPdf, onExportExcel }) => {
  return (
    <>
      <li onClick={onExportPdf}>
        <Tooltip title="Pdf">
          <Link to="#" >
            <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
          </Link>
        </Tooltip>
      </li>
      <li onClick={onExportExcel}>
        <Tooltip title="Excel">
          <Link to="#">
            <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
          </Link>
        </Tooltip>
      </li>
    </>)
}

export default TooltipIcons