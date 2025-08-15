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

type ExchangeCurrencyResponse struct {
	From   CountryInfo
	To     CountryInfo
	Result float64
}