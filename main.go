package main

import (
	"encoding/hex"
	"fmt"
	"math/rand"
	"os"
	"time"

	svg "github.com/ajstarks/svgo"
)

const (
	letterNum = 26

	fullRotation     = 360.0
	transparencyStep = .03

	width  = 1200
	height = 1200
)

var (
	transperency = 1.0
	rotationStep float64
)

func init() {
	// Seeds to generate random letters
	rand.Seed(time.Now().UnixNano())

	rotationStep = rand.Float64() * 90
}

func main() {
	scetchWidth := width / 2
	scetchHeight := height / 2

	// Main scetch area
	canvas := initCanvas(scetchWidth, scetchHeight)
	drawLetters(canvas)
	closeCanvas(canvas)
}

// Inits basic canvas, and define its draw area
func initCanvas(scetchWidth, scetchHeight int) *svg.SVG {
	canvas := svg.New(os.Stdout)
	canvas.Start(width, height)
	canvas.Rect(0, 0, width, height)
	val, _ := randomHex(3)
	fmt.Println(val)
	canvas.Gstyle("font-family: serif; fill: #" + val + "; font-size: 72pt")
	canvas.Gtransform(fmt.Sprintf("translate(%d, %d)", scetchWidth, scetchHeight))
	return canvas
}

func drawLetters(canvas *svg.SVG) {
	character := getRandomChar()
	for angel := 0.0; angel <= fullRotation; angel += rotationStep {
		canvas.Text(0, 0, character,
			fmt.Sprintf(`transform="rotate(%.3f)"`, angel),
			fmt.Sprintf(`fill-opacity="%.3f"`, transperency))
		transperency -= transparencyStep
	}
}

// Returns random character
func getRandomChar() string {
	return string('a' + rand.Intn(letterNum))
}

func closeCanvas(canvas *svg.SVG) {
	canvas.Gend()
	canvas.Gend()
	canvas.End()
}

func randomHex(n int) (string, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}
