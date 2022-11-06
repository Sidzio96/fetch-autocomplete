import React from "react";
import AntdAutoComplete from "antd/lib/auto-complete";
import Input from "antd/lib/input"
import 'antd/dist/antd.css';
import * as S from './Autocomplete-input.styles';


const AutocompleteInput:React.FC = () => {
    const [value, setValue] = React.useState<string>('');
    const [results, setResults] = React.useState<string[]>([]);
    React.useEffect(() => {
        const api = async () => {
            const data = await fetch(`https://jsonplaceholder.typicode.com/todos?q=${value}`);
            const jsonData = await data.json();
            setResults(jsonData);
        };
        api();
    }, [value]);

    const handleSearch = (value: string) => {
        let result: any
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = results.filter(item => Object.values(item)
                .join("")
                .toLowerCase()
                .includes(value.toLowerCase()));
        }
        setResults(result);
    };

    const extractContent = (str: string) => {
        const span = document.createElement('span');
        span.innerHTML = str;
        return span.textContent || span.innerText;
    };
    const renderItem2 = results.map((result: any) => {
        return (
            <div key={result.toString()}>
                <span style={{ fontWeight: 400 }}>{JSON.stringify(result.title)}</span>
            </div>
        );
    })

    const options = [{label: renderItem2}];

    return (
        <div>
            <S.AppWrapper>
                <div>
                    <S.LabelWrapper>
                        Label
                    </S.LabelWrapper>
                    <AntdAutoComplete
                        onSearch={handleSearch}
                        popupClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={500}
                        onChange={(value: string) => {
                            setValue(extractContent(value));
                            handleSearch(extractContent(value));
                        }}
                        style={{ width: 250 }}
                        value={value === 'undefined' ? '' : value}
                        options={options}
                    >
                        <Input.Search size="large" placeholder="input here" />
                    </AntdAutoComplete>
                </div>
                <S.DescWrapper>
                    Description
                </S.DescWrapper>
            </S.AppWrapper>
        </div>
    );
};
export default AutocompleteInput;