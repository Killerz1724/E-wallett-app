package dto

type ExchangeRatesResponse struct {
	Disclaimer string             `json:"disclaimer"`
	License    string             `json:"license"`
	Timestamp  int64              `json:"timestamp"`
	Base       string             `json:"base"`
	Rates      map[string]float64 `json:"rates"`
}

type CountryInfo struct {
	CountryCode string  `json:"country_code"`
	Rates       float64 `json:"rates"`
}

type ExchangeCurrencyResponse struct {
	From   CountryInfo `json:"from"`
	To     CountryInfo `json:"to"`
	Result float64     `json:"result"`
}
