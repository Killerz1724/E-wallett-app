package repository

import (
	"ewallet/constant"
	"ewallet/entity"
	"io"
	"os"

	storage_go "github.com/supabase-community/storage-go"
	"github.com/supabase-community/supabase-go"
)

type SupabaseClientImpl struct {
	sc *supabase.Client
}

func NewSupabaseClient() *SupabaseClientImpl {
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseToken := os.Getenv("SUPABASE_ANON_KEY")
	
	storageClient, err := supabase.NewClient(supabaseURL, supabaseToken, &supabase.ClientOptions{})

	if err != nil {
		return nil
	}
	return &SupabaseClientImpl{sc: storageClient}
}


func (s *SupabaseClientImpl) UploadFile(bucket string, filepath string, contentType *string, data io.Reader) error {
	upsertOpt := new(bool)
	*upsertOpt = true
	cacheControl := "no-cache"

	_, err := s.sc.Storage.UploadFile(bucket, filepath, data, storage_go.FileOptions{
		Upsert:       upsertOpt,
		CacheControl: &cacheControl,
		ContentType:  contentType,
	})

	if err != nil {
		return &entity.CustomError{Msg: constant.CommonError, Log: err}
	}

	return nil
}

func (s *SupabaseClientImpl) GetPublicFileURL(bucket string, filePath string, url *string){
	res := s.sc.Storage.GetPublicUrl(bucket, filePath)
	*url = res.SignedURL
}