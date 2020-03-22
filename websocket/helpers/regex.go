package regex

import (
	"regexp"
)

var domainRegex, _ = regexp.Compile("^((?:(?:(?:\\w[.\\-+]?)*)\\w)+)((?:(?:(?:\\w[.\\-+]?){0,62})\\w)+)\\.(\\w{2,6})$")

func IsValidDomain(str []byte) bool {
	return domainRegex.Match(str)
}
