package entity

type ExchangeRatesResponse struct {
	Disclaimer string
	License    string
	Timestamp  int64
	Base       string
	Rates      map[string]float64
}

type CountryInfo struct {
	CountryCode string
	Rates       float64
}

type RatesResponse struct {
	PageInfo  PageInfo
	RatesFrom float64
	Rates     []CountryInfo
}

type CountryInfoCode struct {
	CountryCode string
}

type CountryListResponse struct {
	Countries []CountryInfoCode
}

type ExchangeCurrencyResponse struct {
	From   CountryInfo
	To     CountryInfo
	Result float64
}