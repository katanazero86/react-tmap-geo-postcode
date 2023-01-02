import { useState, MouseEvent, useRef, FormEvent, useEffect } from "react";
import {
  StyledButton,
  StyledModalWrap,
  StyledModal,
  StyledModalTitle,
  StyledModalTable,
  StyledTh,
  StyledTd,
  StyledTr,
  StyledModalForm,
  StyledInputWrap,
  StyledInput,
  StyledInputLabel,
  StyledModalBody,
  StyledResultTotalCount,
  StyledTip,
  StyledTupExample,
} from "./TmapGeoPostcode.styles";
import Close from "../Icons/Close";
import { v4 as uuidv4 } from "uuid";
import Pagination from "../Pagination";

const URL = "https://apis.openapi.sk.com/tmap/geo/postcode";

type RowsType = {
  adminDong: string;
  buildingDong: string;
  buildingName: string;
  bunji: string;
  city_do: string;
  eup_myun: string;
  gu_gun: string;
  lat: string;
  latEntr: string;
  legalDong: string;
  lon: string;
  lonEntr: string;
  newBuildingIndex: string;
  newRoadName: string;
  ri: string;
  zipcode: string;
};

interface TmapGeoPostcodeProps {
  appKey: string;
  coordType?:
    | "EPSG3857"
    | "WGS84GEO"
    | "KATECH"
    | "BESSELGEO"
    | "BESSELTM"
    | "GRS80GEO"
    | "GRS80TM"; // default WGS84GEO
  addressFlag?: "F01" | "F02" | "F00"; // default F01
  format?: "json" | "xml";
  count?: number;
  buttonText?: string;
  onSuccess(targetRow: RowsType): void;
}

export default function TmapGeoPostcode({
  appKey,
  coordType = "WGS84GEO",
  addressFlag = "F00",
  format = "json",
  count = 10,
  buttonText = "검색",
  onSuccess,
}: TmapGeoPostcodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowTip, setIsShowTip] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<RowsType[]>([]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      initStates();
      setIsShowTip(true);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef!.current!.value.trim() === "") {
      setIsShowTip(true);
      initStates();
    } else {
      setIsShowTip(false);
      requestGeoPostcode();
    }
  };

  const initStates = () => {
    inputRef!.current!.value = "";
    setPage(1);
    setTotalPage(0);
    setTotalCount(0);
    setRows([]);
  };

  const requestGeoPostcode = async () => {
    setRows([]);
    const params = {
      coordType,
      addressFlag,
      format,
      page: String(page),
      count: String(count),
      addr: inputRef!.current!.value,
      appKey,
    };
    const qs = new URLSearchParams(params);

    try {
      const response = await fetch(`${URL}?${qs.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (Object.hasOwn(data, "error")) {
        console.error(`${data.error.message}(code: ${data.error.code})`);
        return false;
      }
      const coordinateInfo = { ...data.coordinateInfo };
      setTotalCount(+coordinateInfo.totalCount);
      setTotalPage(Math.ceil(+coordinateInfo.totalCount / count));
      setPage(+coordinateInfo.page);
      setRows([...coordinateInfo.coordinate]);
    } catch (err) {
      console.error("지오코딩 우편번호 검색 에러", err);
    }
  };

  const printLegalDongAndBuildingName = ({
    legalDong,
    buildingName,
  }: {
    legalDong: string;
    buildingName: string;
  }) => {
    if (legalDong !== "" && buildingName !== "") {
      return `(${legalDong}, ${buildingName})`;
    }
    if (legalDong !== "" && buildingName === "") {
      return `(${legalDong})`;
    }
    if (legalDong === "" && buildingName !== "") {
      return `(${buildingName})`;
    }
  };

  const handleRowClick = (targetRow: RowsType) => {
    onSuccess(targetRow);
    setIsOpen(false);
  };

  const handlePaginationChange = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    requestGeoPostcode();
  }, [page]);

  return (
    <>
      <StyledButton onClick={handleOpen} wFull>
        {buttonText}
      </StyledButton>
      <StyledModalWrap isOpen={isOpen} onClick={handleClose}>
        <StyledModal>
          <StyledModalTitle>
            우편번호 검색
            <Close setIsOpen={setIsOpen} />
          </StyledModalTitle>
          <StyledModalForm onSubmit={handleSubmit}>
            <StyledInputWrap>
              <StyledInput type="text" ref={inputRef} />
              <StyledInputLabel>지번/도로명</StyledInputLabel>
            </StyledInputWrap>
            <StyledButton type="submit">검색</StyledButton>
          </StyledModalForm>
          {totalCount > 0 && (
            <StyledResultTotalCount>
              검색 결과: {totalCount}
            </StyledResultTotalCount>
          )}

          <StyledModalBody>
            {!isShowTip && (
              <StyledModalTable>
                <thead>
                  <tr>
                    <StyledTh>주소</StyledTh>
                    <StyledTh>우편번호</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <StyledTr
                      key={uuidv4()}
                      onClick={() => handleRowClick(row)}
                    >
                      <StyledTd>
                        {`${row.city_do} ${row.gu_gun} ${row.newRoadName} ${
                          row.newBuildingIndex
                        } ${printLegalDongAndBuildingName(row)}`}
                      </StyledTd>
                      <StyledTd>{row.zipcode}</StyledTd>
                    </StyledTr>
                  ))}
                </tbody>
              </StyledModalTable>
            )}
            {isShowTip && (
              <StyledTip className="info_body">
                <h2>tip</h2>
                <p>
                  아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가
                  검색됩니다.
                </p>
                <p>도로명 + 건물번호</p>
                <StyledTupExample>
                  예) 판교역로 235, 제주 첨단로 242, 을지로 65
                </StyledTupExample>
                <p>지역명(동/리) + 번지</p>
                <StyledTupExample>
                  예) 삼평동 681, 제주 영평동 2181
                </StyledTupExample>
                <p>지역명(동/리) + 건물명(아파트명)</p>
                <StyledTupExample>
                  예) 분당 주공, 연수동 주공3차
                </StyledTupExample>
              </StyledTip>
            )}
            {rows.length > 0 && page !== totalPage && (
              <Pagination
                page={page}
                totalPage={totalPage}
                onChange={handlePaginationChange}
              />
            )}
          </StyledModalBody>
        </StyledModal>
      </StyledModalWrap>
    </>
  );
}
